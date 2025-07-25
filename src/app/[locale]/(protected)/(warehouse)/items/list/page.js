import { ItemsView } from '@/components/warehouse/items/Card'
import { getItems } from "./actions";
import PaginationControls from '@/components/PaginationControls';
import styles from "./itemsList.module.css";
import QueryParamSetterInput from '@/components/QueryParamSetterInput';
import ErrorLoading from '@/components/ErrorLoading';

async function Items({ searchParams }) {
    const searchParamName = 's'; // The query parameter name for search
    const params = await searchParams;
    const limit = params['limit'] ?? 12;
    const offset = params['offset'] ?? 0;
    const search = params[searchParamName] ?? '';

    const data = await getItems(`?limit=${limit}&offset=${offset}${search ? `&s=${search}` : ''}`);
    
    return (
        <>
            <QueryParamSetterInput
                paramName={searchParamName}
            />    
            {data.err || data?.count == 0 ? 
                data.err &&  
                    <ErrorLoading name="warehouse.items.list" message={data.err} className="w-full mt-3 transform-translate-x-1/2 flex justify-center items-center bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 p-5 rounded-md" />
                :
                <>
                    <ItemsView items={data.results} />
                    <PaginationControls
                        resCount={data.count}
                        hasNext={data.next}
                        hasPrev={data.previous}
                    />
                </>
            }
            {data.count == 0 && 
                <ErrorLoading name="warehouse.repositories.table" err="nothing" className="w-full transform-translate-x-1/2 flex justify-center items-center bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 p-5 rounded-md" />
            }
        </>
    )
}

export default Items