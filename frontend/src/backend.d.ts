import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Brand {
    name: string;
    website: string;
    priceRange: string;
}
export type BrandId = bigint;
export interface backendInterface {
    addBrand(name: string, website: string, priceRange: string): Promise<BrandId>;
    getAllBrands(): Promise<Array<Brand>>;
    getBrand(id: BrandId): Promise<Brand>;
}
