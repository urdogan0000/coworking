// Interface for table headers
export interface TableHeader {
  title: string;
  align?: string;
  sortable?: boolean;
  key: string;
}

// Interface for search criteria
export interface SearchCriteria {
  name?: string;
  calories?: number;
}

// Interface for sort criteria
export interface SortCriteria {
  key: string;
  order: "asc" | "desc";
}

// Interface for fetch data parameters
export interface FetchDataParams<T> {
  page: number;
  itemsPerPage: number;
  sortBy: SortCriteria[];
  search: T;
}

// Interface for fetch data result
export interface FetchDataResult<T> {
  items: T[];
  total: number;
}

// Example interface for a dessert item
export interface Resource {
  name: string;
  description: string;
  canRent: boolean;
  type: string;
}
