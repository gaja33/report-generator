import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { CategoryService } from "src/app/services/category/category.service";

@Component({
  selector: "app-category-add-edit",
  templateUrl: "./category-add-edit.component.html",
  styleUrls: ["./category-add-edit.component.scss"],
})
export class CategoryAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      catName: [""],
    });

    if (!this.isAddMode) {
      this.categoryService
        .getCategory(this.id)
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  createCategory() {
    this.categoryService
      .createCategory(this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/category"]);
      });
  }

  updateCategory() {
    this.categoryService
      .updateCategory(this.id, this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/category"]);
      });
  }
}
