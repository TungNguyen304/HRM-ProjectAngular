import { IUnit } from 'src/app/shared/interfaces';

export const handleFormatDataUnit = (units: IUnit[]): any[] => {
  return units.map((unit: IUnit) => {
    if (unit.children && unit.children.length > 0) {
      return {
        data: {
          ...unit,
        },
        children: handleFormatDataUnit(unit.children),
      };
    }
    return {
      data: {
        ...unit,
      },
    };
  });
};

export const handleFormatDataUnitTreeSelect = (units: IUnit[]): any[] => {
  return units.map((unit: IUnit) => {
    if (unit.children && unit.children.length > 0) {
      return {
        key: unit.organization_unit_id,
        data: unit.organization_unit_id,
        label: unit.organization_unit_name,
        children: handleFormatDataUnitTreeSelect(unit.children),
      };
    }
    return {
      key: unit.organization_unit_id,
      label: unit.organization_unit_name,
      data: unit.organization_unit_id,
    };
  });
};
