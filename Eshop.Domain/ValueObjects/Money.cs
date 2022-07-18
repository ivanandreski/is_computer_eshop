﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.ValueObjects
{
    public class Money : ValueObject
    {
        [NotMapped]
        public double Amount
        {
            get {
                switch (Currency)
                {
                    case "EUR":
                        return BasePrice * CurrencyConversonRates.EUR;
                    case "USD":
                        return BasePrice * CurrencyConversonRates.USD;
                    default:
                        return BasePrice;
                }
            }
            set { }
        }

        [NotMapped]
        public string Currency { get; set; }

        [JsonIgnore]
        public double BasePrice { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Amount;
            yield return Currency;
        }
    }
}
