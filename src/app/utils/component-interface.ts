export enum ViewType {
  JSON = 'JSON',
  GRAPHICAL_TABLE = 'Table',
  GRAPHICAL_LIST = 'List',
}

export interface CheckboxItem {
  id: string;
  label: string;
  isChecked: boolean;
}
