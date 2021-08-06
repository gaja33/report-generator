import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ReportMasterService } from "src/app/services/report-master/report-master.service";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-report-master",
  templateUrl: "./report-master.component.html",
  styleUrls: ["./report-master.component.scss"],
})
export class ReportMasterComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reportMasterService: ReportMasterService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      opReportNo: [""],
      reportPrefix: [""],
    });

    this.reportMasterService.getReportMasters().subscribe((resp) => {
      if (resp.length >= 1) {
        this.form.patchValue(resp[0]);
        this.id = resp[0]["_id"];
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.form.value);
    if (this.id) {
      this.updateReportMaster();
    } else {
      this.createReportMaster();
    }
  }

  createReportMaster() {
    this.reportMasterService
      .createReportMaster(this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(["/reports"]);
      });
  }

  updateReportMaster() {
    this.reportMasterService
      .updateReportMaster(this.id, this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(["/reports"]);
      });
  }
}
