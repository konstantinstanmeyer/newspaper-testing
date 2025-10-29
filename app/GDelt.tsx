export default async function GDelt(){
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gdelt?theme=LEADER&count=10`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article`);

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
        return <p>error</p>
    }

    // console.log(data)

    return (
        <div>
            
        </div>
    )
}