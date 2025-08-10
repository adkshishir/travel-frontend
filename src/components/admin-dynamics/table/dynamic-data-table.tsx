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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ChevronUp, ChevronDown, Image, FileText, Calendar, Star, MapPin, User, Package, Activity } from 'lucide-react';
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

// Helper function to format column names for better readability
const formatColumnName = (columnName: string): string => {
  const columnMappings: Record<string, string> = {
    'name': 'Name',
    'title': 'Title',
    'slug': 'URL Slug',
    'description': 'Description',
    'subtitle': 'Subtitle',
    'price': 'Price',
    'duration': 'Duration',
    'groupSize': 'Group Size',
    'rating': 'Rating',
    'question': 'Question',
    'answer': 'Answer',
    'publisher': 'Publisher',
    'updatedAt': 'Last Updated',
    'createdAt': 'Created',
    'mediaId': 'Media',
    'activityId': 'Activity',
    'destinationId': 'Destination',
    'authorId': 'Author',
  };
  
  return columnMappings[columnName] || columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([A-Z])/g, ' $1');
};

// Helper function to get appropriate icon for column
const getColumnIcon = (columnName: string) => {
  const iconMap: Record<string, any> = {
    'media': Image,
    'mediaId': Image,
    'title': FileText,
    'name': FileText,
    'createdAt': Calendar,
    'updatedAt': Calendar,
    'rating': Star,
    'destination': MapPin,
    'destinationId': MapPin,
    'author': User,
    'authorId': User,
    'activity': Activity,
    'activityId': Activity,
    'packages': Package,
    'price': Package,
    'bookings': Calendar,
    'booking': Calendar,
    'startDate': Calendar,
    'endDate': Calendar,
    'status': Activity,
    'paymentStatus': Activity,
    'messages': Activity,
    'message': Activity,
    'email': Activity,
    'phone': Activity,
    'contact': Activity,
    'mail': Activity,
  };
  
  const IconComponent = iconMap[columnName];
  return IconComponent ? <IconComponent className="w-4 h-4 mr-1" /> : null;
};

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
        let aVal = a[sortConfig.key!];
        let bVal = b[sortConfig.key!];
        
        // Handle nested objects for sorting
        if (typeof aVal === 'object' && aVal !== null) {
          aVal = aVal.name || aVal.title || JSON.stringify(aVal);
        }
        if (typeof bVal === 'object' && bVal !== null) {
          bVal = bVal.name || bVal.title || JSON.stringify(bVal);
        }
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        if (aVal < bVal) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
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
      Object.entries(item).some(([key, value]) => {
        if (excludeColumns.includes(key)) return false;
        
        // Handle different value types for search
        let searchableValue = '';
        if (typeof value === 'object' && value !== null) {
          if (value.name) searchableValue += value.name + ' ';
          if (value.title) searchableValue += value.title + ' ';
          if (value.slug) searchableValue += value.slug + ' ';
        } else {
          searchableValue = String(value || '');
        }
        
        return searchableValue.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [sortedData, searchTerm, excludeColumns]);

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

  // Enhanced cell value formatting
  const formatCellValue = (value: any, columnName: string) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">Not set</span>;
    }

    // Handle different data types
    if (typeof value === 'object') {
      if (value instanceof Date) {
        return <span className="text-sm text-gray-600">{value.toLocaleDateString()}</span>;
      }
      
      // Handle media objects
      if (value.thumbnail || value.original) {
        return (
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-blue-600">Image attached</span>
          </div>
        );
      }
      
      // Handle nested objects (like destination, activity, author)
      if (value.name) {
        return (
          <div className="flex items-center gap-2">
            {getColumnIcon(columnName)}
            <span className="font-medium">{value.name}</span>
            {value.slug && <Badge variant="outline" className="text-xs">{value.slug}</Badge>}
          </div>
        );
      }
      
      if (value.title) {
        return (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            <span className="font-medium">{value.title}</span>
          </div>
        );
      }
      
      // Handle arrays
      if (Array.isArray(value)) {
        return (
          <Badge variant="secondary">
            {value.length} item{value.length !== 1 ? 's' : ''}
          </Badge>
        );
      }
      
      // Fallback for other objects
      return <span className="text-xs text-gray-500">Complex data</span>;
    }

    // Handle specific column types
    if (columnName === 'price') {
      return <span className="font-semibold text-green-600">${value}</span>;
    }
    
    if (columnName === 'rating') {
      return (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{value}</span>
        </div>
      );
    }
    
    if (columnName === 'duration') {
      return <Badge variant="outline">{value} days</Badge>;
    }
    
    if (columnName === 'groupSize') {
      return <Badge variant="outline">{value} people</Badge>;
    }
    
    if (columnName.includes('Date') || columnName.includes('At')) {
      return <span className="text-sm text-gray-600">{new Date(value).toLocaleDateString()}</span>;
    }
    
    if (columnName === 'slug') {
      return <Badge variant="secondary" className="font-mono text-xs">{value}</Badge>;
    }

    // Handle long text
    const stringValue = String(value);
    if (stringValue.length > 50) {
      return (
        <span className="text-sm" title={stringValue}>
          {stringValue.substring(0, 47)}...
        </span>
      );
    }

    return <span className="text-sm">{stringValue}</span>;
  };

  const handleDelete = async (id: string | number) => {
    setIsDeleting(true);
    await deleteData(ENDPOINT, id);
    router.refresh();
    setIsDeleting(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getColumnIcon(title.toLowerCase())}
          {title} Management
        </CardTitle>
        <CardDescription>
          Manage your {title.toLowerCase()} with advanced search, sorting, and filtering capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full space-y-6'>
          {/* Search and Stats */}
          <div className='flex items-center justify-between gap-4'>
            <div className='relative max-w-md w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder={`Search ${title.toLowerCase()}...`}
                className='pl-10'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{filteredData.length}</Badge>
                <span>total items</span>
              </div>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{filteredData.length}</Badge>
                  <span>filtered results</span>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className='rounded-lg border bg-white shadow-sm'>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  {columns.map((column) => (
                    <TableHead key={column} className="font-semibold">
                      <Button
                        variant='ghost'
                        className='flex items-center p-0 font-semibold hover:bg-transparent'
                        onClick={() => requestSort(column)}>
                        {getColumnIcon(column)}
                        {formatColumnName(column)}
                        {getSortDirectionIcon(column)}
                      </Button>
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-gray-50/50">
                      {columns.map((column) => (
                        <TableCell key={`${rowIndex}-${column}`} className="py-4">
                          {formatCellValue(row[column], column)}
                        </TableCell>
                      ))}
                      <TableCell className='py-4'>
                        <div className="flex items-center gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/${EDIT_NAME}/${row.slug || row.id}/edit` || '/'}>
                              Edit
                            </Link>
                          </Button>
                          <DeleteModal
                            onDelete={() => handleDelete(row.id)}
                            title='Delete Confirmation'
                            description={`Are you sure you want to delete this ${title.toLowerCase().slice(0, -1)}? This action cannot be undone.`}
                            loading={isDeleting}
                            triggerText='Delete'
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className='h-32 text-center'>
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Search className="h-8 w-8" />
                        <div>
                          <p className="font-medium">No results found</p>
                          <p className="text-sm">Try adjusting your search terms</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
              </div>
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
