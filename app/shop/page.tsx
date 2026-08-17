import type {Metadata} from "next";import ShopCatalog from "./ShopCatalog";
export const metadata:Metadata={title:"ПАРА — обувь для города",description:"Мультибрендовая обувная витрина: кроссовки, трейл, классика и городские пары.",openGraph:{title:"ПАРА — обувь для города",description:"12 пар. Один город. Найдите свой ритм.",images:["/images/para-og.png"]},twitter:{card:"summary_large_image",title:"ПАРА — обувь для города",description:"12 пар. Один город. Найдите свой ритм.",images:["/images/para-og.png"]}};
export default function ShopPage(){return <ShopCatalog/>}
