import sqlite3
import json

def resolve_objective_strings(conn, objective_hashes):
    """
    Resolve objective strings for triumph requirements using their hashes.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        objective_hashes (list): List of objective hashes.

    Returns:
        list: A list of objective descriptions.
    """
    cursor = conn.cursor()
    descriptions = []
    for objective_hash in objective_hashes:
        cursor.execute(
            "SELECT json FROM DestinyObjectiveDefinition WHERE json_extract(json, '$.hash') = ?",
            (objective_hash,)
        )
        result = cursor.fetchone()
        if result:
            objective_data = json.loads(result[0])
            descriptions.append(objective_data.get("progressDescription", ""))
    return descriptions

def resolve_destination_name(conn, destination_hash):
    """
    Resolve the destination name using the destination hash.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        destination_hash (int): Hash identifier for the destination.

    Returns:
        str: The name of the destination.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyDestinationDefinition WHERE json_extract(json, '$.hash') = ?",
        (destination_hash,)
    )
    result = cursor.fetchone()
    if result:
        destination_data = json.loads(result[0])
        return destination_data.get("displayProperties", {}).get("name", "")
    return ""

def extract_item_details(conn, item_hash):
    """
    Extract detailed item information from the DestinyInventoryItemDefinition table.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        item_hash (int): Hash identifier for the item.

    Returns:
        dict: A dictionary containing detailed item information.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyInventoryItemDefinition WHERE json_extract(json, '$.hash') = ?",
        (item_hash,)
    )
    result = cursor.fetchone()
    if result:
        item_data = json.loads(result[0])
        item_category_hashes = item_data.get("itemCategoryHashes", [])
        equipping_block = item_data.get("equippingBlock", {})
        return {
            "id": item_data.get("hash"),
            "name": item_data.get("displayProperties", {}).get("name"),
            "hash": item_data.get("hash"),
            "type": (
                "weapon" if 1 in item_category_hashes else
                "armor" if 20 in item_category_hashes else
                None  # Exclude extras
            ),
            "weaponType": item_data.get("itemTypeDisplayName") if 1 in item_category_hashes else None,
            "armorType": (
                "Helmet" if 45 in item_category_hashes else
                "Gauntlets" if 46 in item_category_hashes else
                "Chest" if 47 in item_category_hashes else
                "Legs" if 48 in item_category_hashes else
                "ClassItem" if 49 in item_category_hashes else
                None
            ),
            "classType": (
                "Warlock" if 21 in item_category_hashes else
                "Titan" if 22 in item_category_hashes else
                "Hunter" if 23 in item_category_hashes else
                None
            ),
            "damageType": (
                "Arc" if 2303181850 in item_data.get("damageTypeHashes", []) else
                "Solar" if 1847026933 in item_data.get("damageTypeHashes", []) else
                "Void" if 3454344768 in item_data.get("damageTypeHashes", []) else
                "Stasis" if 151347233 in item_data.get("damageTypeHashes", []) else
                "Strand" if 3949783978 in item_data.get("damageTypeHashes", []) else
                "Kinetic" if 3373582085 in item_data.get("damageTypeHashes", []) else
                None
            ),
            "ammoType": (
                "Primary" if equipping_block.get("ammoType") == 1 else
                "Special" if equipping_block.get("ammoType") == 2 else
                "Heavy" if equipping_block.get("ammoType") == 3 else
                None
            ),
            "image": "https://bungie.net" + item_data.get("displayProperties", {}).get("icon"),
            "encounterId": []  # Default to an empty array; populate if encounter data is available
        }
    return {}

def extract_dungeon_loot(conn, source_hash):
    """
    Extract dungeon loot (weapons and armor) from the Destiny SQLite database.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        source_hash (int): Source hash identifier for the dungeon loot.

    Returns:
        list: A list containing the loot information.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyCollectibleDefinition WHERE json_extract(json, '$.sourceHash') = ?",
        (source_hash,)
    )
    loot = []
    for row in cursor.fetchall():
        collectible = json.loads(row[0])
        item_hash = collectible.get("itemHash")
        if item_hash:
            # Fetch detailed item information using the itemHash
            item_details = extract_item_details(conn, item_hash)
            if item_details["type"] in ["weapon", "armor"]:  # Only include weapons and armor
                loot.append(item_details)
    return loot

def extract_triumph_hashes(conn, presentation_node_hash):
    """
    Extract triumph hashes from the DestinyPresentationNodeDefinition table.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        presentation_node_hash (int): Hash identifier for the presentation node.

    Returns:
        list: A list of triumph hashes.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyPresentationNodeDefinition WHERE json_extract(json, '$.hash') = ?",
        (presentation_node_hash,)
    )
    result = cursor.fetchone()
    if result:
        presentation_node_data = json.loads(result[0])
        return [record.get("recordHash") for record in presentation_node_data.get("children", {}).get("records", [])]
    return []

def extract_dungeon_triumphs(conn, presentation_node_hash, title_triumph_hashes=None):
    """
    Extract dungeon triumphs from the Destiny SQLite database.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        presentation_node_hash (int): Hash identifier for the presentation node.
        title_triumph_hashes (list): List of triumph hashes required for the title.

    Returns:
        list: A list containing the triumphs information.
    """
    triumph_hashes = extract_triumph_hashes(conn, presentation_node_hash)
    triumphs = []
    cursor = conn.cursor()

    for triumph_hash in triumph_hashes:
        cursor.execute(
            "SELECT json FROM DestinyRecordDefinition WHERE json_extract(json, '$.hash') = ?",
            (triumph_hash,)
        )
        result = cursor.fetchone()
        if result:
            record = json.loads(result[0])
            objective_hashes = record.get("objectiveHashes", [])
            requirements = resolve_objective_strings(conn, objective_hashes)

            # Extract reward information from rewardItems
            reward_items = record.get("rewardItems", [])
            reward = None
            if reward_items:
                reward_item_hash = reward_items[0].get("itemHash")
                if reward_item_hash:
                    reward = extract_item_details(conn, reward_item_hash)

            # Check if this triumph is required for the title
            is_title_requirement = triumph_hash in (title_triumph_hashes or [])

            triumphs.append({
                "id": record.get("hash"),
                "name": record.get("displayProperties", {}).get("name"),
                "hash": record.get("hash"),
                "icon": "https://bungie.net" + record.get("displayProperties", {}).get("icon"),
                "description": record.get("displayProperties", {}).get("description"),
                "requirements": requirements,
                "reward": reward,
                "isTitleRequirement": is_title_requirement  # Flag for title-related triumphs
            })

    return triumphs

def extract_dungeon_info(conn, dungeon_hash):
    """
    Extract dungeon information from the Destiny SQLite database.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        dungeon_hash (int): Hash identifier for the dungeon.

    Returns:
        dict: A dictionary containing the dungeon's information.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyActivityDefinition WHERE json_extract(json, '$.hash') = ?",
        (dungeon_hash,)
    )
    result = cursor.fetchone()
    if result:
        dungeon_data = json.loads(result[0])
        destination_hash = dungeon_data.get("destinationHash")
        location_name = resolve_destination_name(conn, destination_hash)
        return {
            "id": dungeon_hash,
            "name": dungeon_data.get("displayProperties", {}).get("name"),
            "hash": dungeon_hash,
            "description": dungeon_data.get("displayProperties", {}).get("description"),
            "image": "https://bungie.net" + dungeon_data.get("pgcrImage"),
            "location": location_name,
            "requirements": [],  # Leave requirements as empty for now
            "exoticWeapon": {},  # Leave exoticWeapon as empty for now
            "encounters": []  # Leave encounters as empty for now
        }
    return {}

import os

def populate_dungeons_data(db_path, dungeons, output_path):
    """
    Populate data for multiple dungeons including loot, triumphs, and general information.

    Args:
        db_path (str): Path to the Destiny SQLite database file.
        dungeons (list): List of dictionaries containing dungeon_hash, source_hash, and presentation_node_hash.
        output_path (str): Path to save the populated dungeon data JSON file.
    """
    # Load existing dungeons data if the file exists
    if os.path.exists(output_path):
        with open(output_path, 'r', encoding='utf-8') as file:
            existing_dungeons = json.load(file)
    else:
        existing_dungeons = []

    # Create a set of existing dungeon hashes for quick lookup
    existing_hashes = {dungeon["id"] for dungeon in existing_dungeons}

    conn = sqlite3.connect(db_path)
    all_dungeons = existing_dungeons  # Start with existing dungeons

    for dungeon in dungeons:
        dungeon_hash = dungeon["dungeon_hash"]

        print(dungeon_hash)

        # Skip adding the dungeon if it already exists
        if dungeon_hash in existing_hashes:
            print(f"Skipping dungeon with hash {dungeon_hash} (already exists).")
            continue

        source_hash = dungeon["source_hash"]
        presentation_node_hash = dungeon["presentation_node_hash"]
        title_presentation_node_hash = dungeon.get("title_presentation_node_hash")

        # Extract dungeon information
        dungeon_info = extract_dungeon_info(conn, dungeon_hash)

        # Extract title data
        title_data = extract_title_data(conn, title_presentation_node_hash) if title_presentation_node_hash else None
        dungeon_info["title"] = title_data

        # Extract triumphs
        title_triumph_hashes = title_data["triumphHashes"] if title_data else []
        dungeon_info["triumphs"] = extract_dungeon_triumphs(conn, presentation_node_hash, title_triumph_hashes)

        # Extract loot
        dungeon_info["loot"] = extract_dungeon_loot(conn, source_hash)

        # Add the new dungeon to the list
        all_dungeons.append(dungeon_info)

    conn.close()

    # Save all dungeons data to a JSON file
    with open(output_path, 'w', encoding='utf-8') as output_file:
        json.dump(all_dungeons, output_file, indent=2, ensure_ascii=False)

    print(f"All dungeon data exported to {output_path}")


    
def extract_title_data(conn, presentation_node_hash):
    """
    Extract title data from the Destiny SQLite database.

    Args:
        conn (sqlite3.Connection): SQLite database connection.
        presentation_node_hash (int): Hash identifier for the presentation node.

    Returns:
        dict: A dictionary containing the title's name, icon, and associated triumphs.
    """
    cursor = conn.cursor()
    cursor.execute(
        "SELECT json FROM DestinyPresentationNodeDefinition WHERE json_extract(json, '$.hash') = ?",
        (presentation_node_hash,)
    )
    result = cursor.fetchone()
    if result:
        node_data = json.loads(result[0])
        title_name = node_data.get("displayProperties", {}).get("name")
        title_icon = "https://bungie.net" + node_data.get("displayProperties", {}).get("icon", "")
        triumph_hashes = [
            record.get("recordHash")
            for record in node_data.get("children", {}).get("records", [])
        ]
        return {
            "name": title_name,
            "icon": title_icon,
            "triumphHashes": triumph_hashes
        }
    return None

def main():
    db_path = 'world_sql_content.db'  # Replace with the actual path to your SQLite database

    dungeons = [
        {
            # Shattered Throne
            "dungeon_hash": 2032534090, 
            "source_hash": 2559145507,
            "presentation_node_hash": 1347078175
        },
        {
            # Pit of Heresy
            "dungeon_hash": 2582501063,
            "source_hash": 1999000205,
            "presentation_node_hash": 2828966211
        },
        {
            # Prophecy
            "dungeon_hash": 1077850348,
            "source_hash": 506073192,
            "presentation_node_hash": 2228154284
        },
        {
            # Grasp of Avarice
            "dungeon_hash": 4078656646,
            "source_hash": 675740011,
            "presentation_node_hash": 1476825620
        },
        {
            # Duality
            "dungeon_hash": 2823159265,
            "source_hash": 1282207663,
            "presentation_node_hash": 4032492628,
            "title_presentation_node_hash": 854126634
        },
        {
            # Spire of the Watcher
            "dungeon_hash": 1262462921,
            "source_hash": 1597738585,
            "presentation_node_hash": 3846053700,
            "title_presentation_node_hash": 4183969062
        },
        {
            # Ghosts of the Deep
            "dungeon_hash": 313828469,
            "source_hash": 3288974535,
            "presentation_node_hash": 2279316529,
            "title_presentation_node_hash": 1705744655
        },
        {
            # Warlords Ruin
            "dungeon_hash": 2004855007,
            "source_hash": 613435025,
            "presentation_node_hash": 3022435577,
            "title_presentation_node_hash": 1021469803
        },
        {
            # Vespers Host
            "dungeon_hash": 300092127,
            "source_hash": 2463956052,
            "presentation_node_hash": 3254829425,
            "title_presentation_node_hash": 2723381343  
        },
        {
            # Sundered Doctrine
            "dungeon_hash": 3834447244,
            "source_hash": 3095773956,
            "presentation_node_hash": 2009673092,
            "title_presentation_node_hash": 2105055614
        }
    ];

    output_path = 'dungeons_data.json'  # Path to save the populated dungeon data

    # Populate data for all dungeons
    populate_dungeons_data(db_path, dungeons, output_path)

if __name__ == "__main__":
    main()