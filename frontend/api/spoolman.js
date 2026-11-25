/**
 * @typedef {Object} FilamentStock
 * @property {number} id
 * @property {string} name
 * @property {string[]} colors
 * @property {string | null} material
 * @property {string | null} vendor
 * @property {number} spoolCount
 * @property {number} knownGrams
 * @property {number} unweighedSpools
 */

/** @returns {Promise<FilamentStock[]>} Stock grouped by Spoolman filament ID. */
export async function getFilamentStock() {
  const baseUrl = process.env.SPOOLMAN_URL?.trim();
  if (!baseUrl) throw new Error("SPOOLMAN_URL is missing");

  const url = new URL("api/v1/spool?allow_archived=false", baseUrl.replace(/\/+$/, "") + "/");
  const username = process.env.SPOOLMAN_USERNAME;
  const password = process.env.SPOOLMAN_PASSWORD;
  const headers = new Headers();
  if (username || password) {
    if (!username || !password) throw new Error("Spoolman Basic Auth requires both username and password");
    if (url.protocol !== "https:") throw new Error("Spoolman Basic Auth requires an HTTPS URL");
    const credentials = Buffer.from(`${username}:${password}`).toString("base64");
    headers.set("Authorization", `Basic ${credentials}`);
  }
  const response = await fetch(url, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Could not load filament stock (HTTP ${response.status})`);

  const spools = await response.json();
  if (!Array.isArray(spools)) throw new Error("Expected a list of spools from Spoolman");

  /** @type {Map<number, FilamentStock>} */
  const stock = new Map();
  for (const spool of spools) {
    const { filament, remaining_weight: grams } = spool;
    let item = stock.get(filament.id);
    if (!item) {
      item = {
        id: filament.id,
        name: filament.name || `Filament #${filament.id}`,
        colors: (filament.multi_color_hexes || filament.color_hex || "")
          .split(",")
          .map((color) => color.trim().replace(/^#/, ""))
          .filter((hex) => /^(?:[\da-f]{6}|[\da-f]{8})$/i.test(hex))
          .map((hex) => `#${hex}`),
        material: filament.material ?? null,
        vendor: filament.vendor?.name ?? null,
        spoolCount: 0,
        knownGrams: 0,
        unweighedSpools: 0,
      };
      stock.set(filament.id, item);
    }
    item.spoolCount++;
    if (Number.isFinite(grams)) item.knownGrams += grams;
    else item.unweighedSpools++;
  }
  return Array.from(stock.values());
}
