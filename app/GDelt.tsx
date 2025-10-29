export default async function GDelt(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gdelt?theme=LEADER&count=10`);

    if (!res.ok) {
        return <p>error</p>
    }

    const data = res;

    // console.log(data)

    return (
        <div>
            
        </div>
    )
}