using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggreegate
{
    public class Order
    {
        public int Id {get; set;}
        public string BuyerId {get; set;}
        
        [Required]
        public ShippingAddress ShippingAddress {get; set;}
        public DateTime OrderDate {get; set;} = DateTime.Now;
        public List<OrderItem> OrderItems {get; set;}
        public long Subtotal {get; set;}
        public long DeliveryFee {get; set;}
        public OrderStatus OrderStatus {get; set;} = OrderStatus.Pending;

        public long GetTotal(){
            return Subtotal + DeliveryFee;
        }
    }
}