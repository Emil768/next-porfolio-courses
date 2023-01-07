export interface PopupProps {
  items: PopupItems[];
  activeLabel?: { name: string; type: string };
  active: Boolean;
}

export type PopupActiveProps = { name: string; type: string };

export type PopupItems = {
  name: string;
  type?: string;
  link?: String;
  onClickPopup?: ({ name, type }: PopupActiveProps) => void;
};
