import Card from '@/components/warehouse/items/Card'
import { getItems } from "./actions";
import PaginationControls from '@/components/PaginationControls';
import styles from "./itemsList.module.css";
import SearchInput from '@/components/SearchInput';


async function Items({ searchParams }) {
    const params = await searchParams;
    const limit = params['limit'] ?? 12;
    const offset = params['offset'] ?? 0;
    const search = params['s'] ?? '';

    const data = await getItems(`?limit=${limit}&offset=${offset}${search ? `&s=${search}` : ''}`);

    return (
        <>
        <SearchInput />
        <div className={styles['items-wrapper']}>
            {data.results.map((item) => (
                <Card 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    origin={item.origin}
                    place={item.place}
                    p4={item.price4}
                    imgSrc={item.images[0]}
                />
            ))}
        </div>
        <PaginationControls 
                resCount={data.count}
                hasNext={data.next}
                hasPrev={data.previous}
        />  
        </>
    )
}

export default Items
