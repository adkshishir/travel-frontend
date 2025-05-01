'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteData } from '@/utils/request-intregation';
import { DeleteModal } from '@/components/deletemodal';

interface DataTableProps {
  data: Record<string, any>[];
  excludeColumns?: string[];
  pageSize?: number;
  title: string;
  ENDPOINT: string;
  EDIT_NAME?: string;
}

export default function DynamicDataTable({
  data = [],
  excludeColumns = [],
  pageSize = 10,
  title,
  ENDPOINT,
  EDIT_NAME,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null,
  });
  // Extract column headers from the first object in the array
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => !excludeColumns.includes(key));
  }, [data, excludeColumns]);

  // Handle sorting
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig.key && sortConfig.direction) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key!] === null) return 1;
        if (b[sortConfig.key!] === null) return -1;

        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Handle search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, searchTerm]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Request sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Get sort direction icon
  const getSortDirectionIcon = (columnName: string) => {
    if (sortConfig.key !== columnName) {
      return null;
    }

    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className='ml-1 h-4 w-4' />
    ) : sortConfig.direction === 'descending' ? (
      <ChevronDown className='ml-1 h-4 w-4' />
    ) : null;
  };

  // Format cell value for display
  const formatCellValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') {
      if (value instanceof Date) return value.toLocaleString();
      return JSON.stringify(value);
    }
    return String(value);
  };

  const handleDelete = async (id: string | number) => {
    setIsDeleting(true);
    await deleteData(ENDPOINT, id);
    router.refresh();
    setIsDeleting(false);
  };
  return (
    <div className='border rounded-md bg-white p-4'>
      <h1>{title} Table</h1>
      <div className='w-full space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='relative max-w-md w-full'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='pl-8'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <div className='text-sm text-muted-foreground'>
            {filteredData.length} items total
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column}>
                    <Button
                      variant='ghost'
                      className='flex items-center p-0 font-medium'
                      onClick={() => requestSort(column)}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {getSortDirectionIcon(column)}
                    </Button>
                  </TableHead>
                ))}
                <TableHead key='actions'>
                  <Button
                    variant='ghost'
                    className='flex items-center p-0 font-medium'>
                    Actions
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column}`}>
                        {formatCellValue(row[column])}
                      </TableCell>
                    ))}
                    <TableCell
                      key={`${rowIndex}-actions`}
                      className='flex justify-center w-fit'>
                      <Link
                        href={`/${EDIT_NAME}/${row.slug || row.id}/edit` || '/'}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2'>
                        Edit
                      </Link>
                      <DeleteModal
                        onDelete={() => {
                          handleDelete(row.id);
                        }}
                        title='Delete Confirmation'
                        description='Are you sure you want to delete this item? This action cannot be undone.'
                        loading={isDeleting}
                        triggerText='Delete'
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
