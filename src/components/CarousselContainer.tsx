import React from "react";

export default function CarousselContainer({Card, data}: {Card: React.ElementType, data: any[]}) {
  return (
    <div className="max-w-[100vw] overflow-x-auto flex gap-2">
      {data.map((e, index)=>(
        <Card key={index} data={e} />
      ))}
    </div>
  )
}
