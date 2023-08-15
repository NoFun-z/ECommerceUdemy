
namespace API.RequestHelper
{
    public class ProductParams: PaginationPrams
    {
        public string OrderBy {get; set;}
        public string SearchTerm {get; set;}
        public string Types {get; set;}
        public string Brands {get; set;}
    }
}