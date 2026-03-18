import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SearchBar() {
    return (
        <Field orientation="horizontal">
            <Input type="search" placeholder="Search..." className="w-full" />
            <Button>Search</Button>
        </Field>
    )
}
