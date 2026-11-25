import { connection } from "next/server";
import { getFilamentStock } from "@/api/spoolman";

type FilamentStock = Awaited<ReturnType<typeof getFilamentStock>>[number];
const kilograms = new Intl.NumberFormat("en", { maximumFractionDigits: 3 });

function remainingWeight({ knownGrams, unweighedSpools, spoolCount }: FilamentStock) {
  if (unweighedSpools === spoolCount) return "Unknown";
  const weight = `${kilograms.format(knownGrams / 1000)} kg`;
  return unweighedSpools > 0 ? `At least ${weight}` : weight;
}

function FilamentSpool({ colors }: { colors: string[] }) {
  const fill = colors.length > 1 ? `linear-gradient(105deg, ${colors.join(", ")})` : colors[0];
  return (
    <span aria-hidden="true" className="relative block aspect-[1.45] w-[64%] max-w-32 -rotate-9">
      <span className="absolute inset-y-0 left-0 w-[24%] rounded-[50%] border border-neutral-900 bg-linear-to-r from-neutral-800 via-neutral-600 to-neutral-800" />
      <span
        className="absolute inset-[11%] overflow-hidden rounded-[10%/50%] bg-[repeating-linear-gradient(45deg,#b8b4ad_0_5px,#e1ddd5_5px_10px)]"
        style={{ background: fill }}
      >
        <span className="absolute inset-0 bg-[repeating-linear-gradient(91deg,transparent_0_2px,#0003_2px_3px,#fff3_3px_4px)]" />
        <span className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/35" />
      </span>
      <span className="absolute inset-y-0 right-0 w-[24%] rounded-[50%] border border-neutral-900 bg-[radial-gradient(ellipse_at_center,#141615_0_19%,#676c69_20%_24%,#393d3b_25%_63%,#565b58_64%_69%,#262927_70%)]" />
    </span>
  );
}

export default async function StockList() {
  await connection();
  let stock: FilamentStock[];
  try {
    stock = await getFilamentStock();
  } catch {
    return <p>Filament stock is temporarily unavailable.</p>;
  }
  if (stock.length === 0) return <p>No filament spools in stock.</p>;

  return (
    <ul aria-labelledby="filament-heading" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {stock.map((item) => (
        <li key={item.id} className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/15 py-6">
          <FilamentSpool colors={item.colors} />
          <span className="max-w-full px-2 text-center font-semibold tabular-nums">
            <span className="block wrap-anywhere text-sm font-normal">{item.material?.trim() || "Unspecified material"}</span>
            <span className="sr-only">{item.name}{item.colors.length ? "" : ", color unspecified"}, remaining weight: </span>
            {remainingWeight(item)}
          </span>
        </li>
      ))}
    </ul>
  );
}
