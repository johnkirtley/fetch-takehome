import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"
import getDogs from "../utils/getDogs"

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface PaginationProps {
    paginationInfo: {
        next: string;
        prev: string;
    },
    sortType: string,
    setFilteredBreeds: React.Dispatch<React.SetStateAction<Dog[]>>,
    setPaginationInfo: React.Dispatch<React.SetStateAction<{
        next: string;
        prev: string;
    }>>
}

export default function Paginate({ paginationInfo, sortType, setFilteredBreeds, setPaginationInfo }: PaginationProps) {
    const handlePagination = async (url: string) => {

        const { dogsData, searchResponse } = await getDogs(sortType, url)
        setFilteredBreeds(dogsData)

        const nextPageEmpty = async () => {
            if (searchResponse.next) {
                const { dogsData } = await getDogs(sortType, searchResponse.next)
                return dogsData.length === 0
            }

            return true
        }

        const isNextPageEmpty = await nextPageEmpty()

        setPaginationInfo({
            prev: searchResponse.prev || '',
            next: isNextPageEmpty ? '' : (searchResponse.next || '')
        })
    }

    return (
        <Pagination className="mt-5">
            <PaginationContent>
                <PaginationItem>
                    {paginationInfo.prev && <PaginationPrevious onClick={() => handlePagination(paginationInfo.prev)} />}
                </PaginationItem>
                <PaginationItem>
                    {paginationInfo.next && <PaginationNext onClick={() => handlePagination(paginationInfo.next)} />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}