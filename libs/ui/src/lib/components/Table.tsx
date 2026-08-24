import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface TableColumn {
  title: string;
  value: string;
  body?: (rowData: any) => any;
}

interface TableComponentProps {
  header: React.ReactNode;
  dataSource: any[];
  columns: TableColumn[];
  pagination?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  header,
  dataSource,
  columns,
  pagination = false,
  rows = 10,
  rowsPerPageOptions = [10, 20, 50],
  ...rest
}): JSX.Element => {
  return (
    <div className="card">
      <DataTable
        header={header}
        size="large"
        value={dataSource}
        removableSort
        tableStyle={{ minWidth: "73.2rem" }}
        paginator={pagination}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        {...rest}
      >
        {columns.map((col, key) => (
          <Column
            field={col.value}
            header={col.title}
            body={col.body}
            sortable
            key={key}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default TableComponent;
