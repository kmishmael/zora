import { BRAND } from "@/types/brand";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "X.com",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 1.2,
    revenues: "2,740",
    sales: 230,
    conversion: 1.9,
  },
];

const SalesmenPerformance = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Salesmen Performance
        </CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <FilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Branch
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Time Period</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Sales Target</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListOrderedIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="total_sales">
                <DropdownMenuRadioItem value="total_sales">
                  Total Sales
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="sales_target">
                  Sales Target
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="performance">
                  Performance
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Salesman</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Sales Target</TableHead>
              <TableHead>Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">John Doe</TableCell>
              <TableCell>New York</TableCell>
              <TableCell>$250,000</TableCell>
              <TableCell>$300,000</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-xs">83%</div>
                  <Progress value={83} aria-label="83% of target achieved" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jane Smith</TableCell>
              <TableCell>Los Angeles</TableCell>
              <TableCell>$180,000</TableCell>
              <TableCell>$200,000</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-xs">90%</div>
                  <Progress value={90} aria-label="90% of target achieved" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Michael Johnson</TableCell>
              <TableCell>Chicago</TableCell>
              <TableCell>$220,000</TableCell>
              <TableCell>$250,000</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-xs">88%</div>
                  <Progress value={88} aria-label="88% of target achieved" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Emily Davis</TableCell>
              <TableCell>Miami</TableCell>
              <TableCell>$190,000</TableCell>
              <TableCell>$180,000</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-xs">106%</div>
                  <Progress value={106} aria-label="106% of target achieved" />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">David Wilson</TableCell>
              <TableCell>Seattle</TableCell>
              <TableCell>$160,000</TableCell>
              <TableCell>$175,000</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="text-xs">91%</div>
                  <Progress value={91} aria-label="91% of target achieved" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong>
          salesmen
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalesmenPerformance;

function ListOrderedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
