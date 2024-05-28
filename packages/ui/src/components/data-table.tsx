"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CircleUserRound, Wallet } from "lucide-react";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },

    initialState: {
      columnVisibility: {
        fromUserId: false,
        toUserId: false,
      },
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div>
      <div className=" flex items-center justify-between py-6">
        <Input
          placeholder=" Search here for invoice Id"
          value={(table.getColumn("invoice")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("invoice")?.setFilterValue(event.target.value)
          }
          className=" max-w-sm w-full"
        />

        <DataTableFacetedFilter
          column={table.getColumn("name")}
          title="Name/Business"
          options={[
            {
              value: "Wallet",
              label: "Wallet",
              icon: Wallet,
            },
            {
              value: "Peer",
              label: "Peer",
              icon: CircleUserRound,
            },
          ]}
        />
      </div>
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" text-primary font-semibold "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" py-4">
                      
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className=" h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className=" flex items-center justify-center gap-4 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className=" min-w-20"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className=" min-w-20"
        >
          Next
        </Button>
      </div>
      
    </div>
  );
}
