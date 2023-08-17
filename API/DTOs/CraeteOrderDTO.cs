
using API.Entities.OrderAggreegate;

namespace API.DTOs
{
    public class CraeteOrderDTO
    {
        public bool SaveAddress{get; set;}
        public ShippingAddress ShippingAddress {get; set;}
    }
}