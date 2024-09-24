import { DisplayCard, SearchItem } from "@/components"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function page(){
    return(
        <div className="min-h-screen">
            <SearchItem />
            <DisplayCard />
        </div>
    )
}