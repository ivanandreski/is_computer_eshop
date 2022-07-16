using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.ValueObjects
{
    public class Money : ValueObject
    {
        public double Amount
        {
            get {
                switch (Currency)
                {
                    case "EUR":
                        return AmountInMKD * CurrencyConversonRates.EUR;
                    case "USD":
                        return AmountInMKD * CurrencyConversonRates.USD;
                    default:
                        return AmountInMKD;
                }
            }
            set { }
        }

        public string Currency { get; set; }

        public double AmountInMKD { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Amount;
            yield return Currency;
        }
    }
}
