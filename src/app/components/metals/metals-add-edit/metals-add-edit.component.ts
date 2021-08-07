import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { MetalService } from "src/app/services/metal/metal.service";

@Component({
  selector: "app-metals-add-edit",
  templateUrl: "./metals-add-edit.component.html",
  styleUrls: ["./metals-add-edit.component.scss"],
})
export class MetalsAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private metalService: MetalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      metalName: [""],
      thickness: [""],
    });

    if (!this.isAddMode) {
      this.metalService
        .getMetal(this.id)
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
      this.createMetal();
    } else {
      this.updateMetal();
    }
  }

  createMetal() {
    this.metalService.createMetal(this.form.value).subscribe((response) => {
      this.router.navigate(["/metal"]);
    });
  }

  updateMetal() {
    this.metalService
      .updateMetal(this.id, this.form.value)
      .subscribe((response) => {
        this.router.navigate(["/metal"]);
      });
  }
}
