import { getDamageTypeIcon, getAmmoTypeIcon } from "@/util/imageUtil";

export default function ExoticWeaponSection({ exoticWeapon }: { exoticWeapon: any }) {
  if (!exoticWeapon) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={exoticWeapon.image}
            alt={exoticWeapon.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold text-yellow-400">{exoticWeapon.name}</h3>
            <p className="text-xs text-gray-400">{exoticWeapon.weaponType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={getDamageTypeIcon(exoticWeapon.damageType)}
            alt={exoticWeapon.damageType}
            className="w-6 h-6"
          />
          <img
            src={getAmmoTypeIcon(exoticWeapon.ammoType)}
            alt={exoticWeapon.ammoType}
            className="w-6 h-6"
          />
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-300">
        <strong>Source:</strong> {exoticWeapon.source}
      </p>
      {exoticWeapon.exoticperks && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-yellow-400">Exotic Perks</h4>
          <div className="space-y-4 mt-2">
            {exoticWeapon.exoticperks.map((perk: any, index: number) => (
              <div key={index} className="flex items-start space-x-4">
                <img
                  src={perk.image}
                  alt={perk.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div>
                  <h5 className="text-xs font-semibold">{perk.name}</h5>
                  <p className="text-xs text-gray-300">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {exoticWeapon.catalyst && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-yellow-400">Catalyst</h4>
          <div className="space-y-4 mt-2">
            <div className="flex items-start space-x-4">
              <img
                src={exoticWeapon.catalyst.image}
                alt={`${exoticWeapon.name} Catalyst`}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <h5 className="text-xs font-semibold">{exoticWeapon.catalyst.name}</h5>
                <p className="text-xs text-gray-300">{exoticWeapon.catalyst.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}