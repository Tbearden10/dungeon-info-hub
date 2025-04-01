const BASE_URL = "https://bungie.net";

export const DAMAGE_TYPE_ICONS: { [key: string]: string } = {
  Kinetic: `${BASE_URL}/img/destiny_content/damage_types/destiny2/kinetic_trans.png`,
  Solar: `${BASE_URL}/img/destiny_content/damage_types/destiny2/thermal_trans.png`,
  Arc: `${BASE_URL}/img/destiny_content/damage_types/destiny2/arc_trans.png`,
  Void: `${BASE_URL}/img/destiny_content/damage_types/destiny2/void_trans.png`,
  Stasis: `${BASE_URL}/img/destiny_content/damage_types/destiny2/stasis-white-96x96.png`,
  Strand: `${BASE_URL}/img/destiny_content/damage_types/destiny2/strand-white-185x185.png`,
};

export const AMMO_TYPE_ICONS: { [key: string]: string } = {
  Primary: `${BASE_URL}/common/destiny2_content/icons/99f3733354862047493d8550e46a45ec.png`,
  Special: `${BASE_URL}/common/destiny2_content/icons/d920203c4fd4571ae7f39eb5249eaecb.png`,
  Heavy: `${BASE_URL}/common/destiny2_content/icons/78ef0e2b281de7b60c48920223e0f9b1.png`,
};

export const CLASS_TYPE_ICONS: { [key: string]: string } = {
  Hunter: `${BASE_URL}/common/destiny2_content/icons/9bb43f897531bb6395bfefc82f2ec267.png`,
  Warlock: `${BASE_URL}/common/destiny2_content/icons/571dd4d71022cbef932b9be873d431a9.png`,
  Titan: `${BASE_URL}/common/destiny2_content/icons/707adc0d9b7b1fb858c16db7895d80cf.png`,
};

export const ARMOR_TYPE_ICONS: { [key: string]: string } = {
  Helmet: `/icons/helmet.svg`,
  Gauntlets: `/icons/arm.svg`,
  Chest: `/icons/chest.svg`,
  Legs: `/icons/boot.svg`,
  ClassItem: `/icons/class.svg`,
};

const FALLBACK_ICONS = {
  damage: `${BASE_URL}/icons/arc.png`,
  ammo: `${BASE_URL}/icons/ammo-primary.svg`,
  class: `${BASE_URL}/icons/hunter.svg`,
  armor: `${BASE_URL}/icons/chest.svg`,
};

/**
 * Converts an RGBA color object into a CSS-compatible `rgba()` string.
 * @param color - The color object with `red`, `green`, `blue`, and `alpha` properties.
 * @returns A CSS-compatible `rgba()` string.
 */
export function rgbaToCss(color: { red: number; green: number; blue: number; alpha: number }): string {
  const { red, green, blue, alpha } = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`; // Convert alpha to 0-1 range
}

/**
 * Utility function to get the icon for a damage type.
 * @param damageType - The damage type (e.g., "Solar", "Arc").
 * @returns The URL of the icon.
 */
export function getDamageTypeIcon(damageType: string): string {
  return DAMAGE_TYPE_ICONS[damageType] || FALLBACK_ICONS.damage;
}

/**
 * Utility function to get the icon for an ammo type.
 * @param ammoType - The ammo type (e.g., "Primary", "Special").
 * @returns The URL of the icon.
 */
export function getAmmoTypeIcon(ammoType: string): string {
  return AMMO_TYPE_ICONS[ammoType] || FALLBACK_ICONS.ammo;
}

/**
 * Utility function to get the icon for a class type.
 * @param classType - The class type (e.g., "Hunter", "Warlock").
 * @returns The URL of the icon.
 */
export function getClassTypeIcon(classType: string): string {
  return CLASS_TYPE_ICONS[classType] || FALLBACK_ICONS.class;
}

/**
 * Utility function to get the icon for an armor type.
 * @param armorType - The armor type (e.g., "Helmet", "Chest").
 * @returns The URL of the icon.
 */
export function getArmorTypeIcon(armorType: string): string {
  return ARMOR_TYPE_ICONS[armorType] || FALLBACK_ICONS.armor;
}

/**
 * Utility function to get the emblem image URL based on size.
 * @param emblemId - The unique ID of the emblem.
 * @param size - The size of the emblem image ("small", "medium", "large").
 * @returns The URL of the emblem image.
 */
export function getEmblemImage(emblemId: string, size: "small" | "medium" | "large"): string {
  const BASE_URL = "https://bungie.net/common/destiny2_content/icons";

  // Define size-specific suffixes
  const sizeSuffixes: { [key: string]: string } = {
    small: "_small",
    medium: "_medium",
    large: "_large",
  };

  // Construct the URL dynamically
  const suffix = sizeSuffixes[size] || "";
  return `${BASE_URL}/${emblemId}${suffix}.png`;
}