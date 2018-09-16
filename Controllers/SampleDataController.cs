using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using System.Collections;

namespace dotnet_angular.Controllers
{

    [Route("api/Products")]
    public class SampleController : Controller
    {
        [HttpGet]
        public JsonResult GetProducts([DataSourceRequest]DataSourceRequest request)
        {
            var result = Json(this.products.ToDataSourceResult(request));
            return result;
        }

        [HttpPost]
        public JsonResult PostProducts([DataSourceRequest]DataSourceRequest request)
        {

            var result = Json(this.products.ToDataSourceResult(request));
            return result;
        }

        private IEnumerable products = new[] {
            new { ID = 1, Name = "Smith" },
            new { ID = 2, Name = "John" }
        };
    }
}
