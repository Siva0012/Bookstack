const { ColumnDef } = require("@tanstack/react-table");

const PaymentColumns = [
  new ColumnDef({
    accessorKey: "status",
    header: "Status",
  }),
  new ColumnDef({
    accessorKey: "email",
    header: "Email",
  }),
  new ColumnDef({
    accessorKey: "amount",
    header: "Amount",
  }),
];

module.exports = {
  columns: PaymentColumns,
};
