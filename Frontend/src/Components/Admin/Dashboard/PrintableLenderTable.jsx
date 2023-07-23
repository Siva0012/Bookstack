import LenderTable from './LenderTable'

function PrintableLenderTable({LenderData}) {
  return (
      <div>
            <LenderTable LenderData={LenderData} />
      </div>
  )
}

export default PrintableLenderTable