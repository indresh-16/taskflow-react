export default function TaskStats({total,completed,remaining}){
    return <>

        <div className="text-center mt-3 font-semibold">
            <p>📋 Total = {total}</p>
            <p className="mt-3 mb-3">✅ completed = {completed}</p>
            <p>⌛ remaining= {remaining}</p>
        </div>
    </>
}