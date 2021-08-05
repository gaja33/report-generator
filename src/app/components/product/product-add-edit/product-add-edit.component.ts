import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ProductService } from "src/app/services/product/product.service";
import { CategoryService } from "src/app/services/category/category.service";
import { VendorServicesService } from "src/app/services/vendor/vendor-services.service";
import { MetalService } from "src/app/services/metal/metal.service";

@Component({
  selector: "app-product-add-edit",
  templateUrl: "./product-add-edit.component.html",
  styleUrls: ["./product-add-edit.component.scss"],
})
export class ProductAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  category: any[];
  vendors: any[];
  thickness: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private vendorService: VendorServicesService,
    private metalService: MetalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.categoryService.getCategorys().subscribe((resp) => {
      this.category = resp;
    });

    this.vendorService.getVendors().subscribe((resp) => {
      this.vendors = resp;
    });

    this.metalService.getMetals().subscribe((resp) => {
      this.thickness = resp;
    });

    this.form = this.formBuilder.group({
      partNumber: [""],
      partName: [""],
      partDescription: [""],
      category: [""],
      weight: [""],
      vendor: [""],
      thickness: [""],
    });

    if (!this.isAddMode) {
      this.productService.getProduct(this.id).subscribe((x) => {
        console.log(x);
        this.form.patchValue(x);
        let thickness = [];
        x.thickness.forEach((x) => thickness.push(x._id));
        this.form.controls["thickness"].setValue(thickness);
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct() {
    this.updateThickness();
    this.productService.createProduct(this.form.value).subscribe((response) => {
      console.log(response);
      this.router.navigate(["/products"]);
    });
  }

  updateProduct() {
    this.updateThickness();
    this.productService
      .updateProduct(this.id, this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/products"]);
      });
  }

  updateThickness() {
    let thickness = [];
    this.thickness.forEach((x) => {
      this.form.value.thickness.forEach((y) => {
        if (y === x._id) {
          thickness.push(x);
        }
      });
    });
    this.form.value.thickness = thickness;
  }
}
