export interface PopupProps {
  items: PopupItems[];
  activeLabel?: { name: string; type: string };
  active: Boolean;
  setStatePopup?: () => void;
}

export type PopupActiveProps = { name: string; type: string; order: string };

export type PopupItems = {
  name: string;
  order?: string;
  type?: string;
  link?: String;

  onClickPopup?: ({ name, type, order }: PopupActiveProps) => void;
};
