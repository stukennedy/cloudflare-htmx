import RootLayout from "./RootLayout";
import DashLayout from "./DashLayout";
import SubLayout from "./SubLayout";
import { LayoutFunction } from "@src/lib/html";

export const layouts: Record<string, LayoutFunction> = {
  "/_layout": RootLayout,
  "/dashboard/_layout": DashLayout,
  "/dashboard/[paramId]/_layout": SubLayout,
};
