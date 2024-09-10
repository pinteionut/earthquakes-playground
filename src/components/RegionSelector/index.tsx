import {
  EbayListboxButton,
  EbayListboxButtonOption,
} from "@ebay/ui-core-react/ebay-listbox-button";
import { Continent } from "../../models/continent";
import "./style.css";

export type RegionSelectorProps = {
  regions: Continent[];
  onChange: (value: string) => void;
  value: string | null;
  disabled: boolean | null;
};

export function RegionSelector({
  regions,
  onChange,
  value,
  disabled,
}: RegionSelectorProps) {
  if (regions.length === 0) {
    return null;
  }

  return (
    <div className="region-selector">
      <EbayListboxButton
        floatingLabel="Select a region"
        onChange={(evt, data: any) => onChange(data.selected[0])}
        value={value || undefined}
        style={{ width: "100%" }}
        disabled={disabled || false}
      >
        {regions.map((region) => (
          <EbayListboxButtonOption key={region.slug} value={region.slug}>
            {region.name}
          </EbayListboxButtonOption>
        ))}
      </EbayListboxButton>
    </div>

    // <EbaySelect
    //   name="formSelect"
    //   onChange={(evt, data: any) => onChange(data.selected[0])}
    //   value={value || undefined}
    // >
    //   {regions.map((region) => (
    //     <EbaySelectOption key={region.slug} value={region.slug}>
    //       {region.name}
    //     </EbaySelectOption>
    //   ))}
    // </EbaySelect>
  );
}
