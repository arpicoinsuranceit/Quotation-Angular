import { CommitmentService } from './../service/commitment/commitment.service';
import { UserProfilePictures } from './../model/userprofilepictures';
import swal from 'sweetalert2';
import { MainRespDto } from './../model/dashboardData';
import { DashboardService } from './../service/dashboard/dashboard.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { DomSanitizer, platformBrowser } from '@angular/platform-browser';
import { error } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imgUserUrl: any;
  private sanitizer: DomSanitizer;
  private image: any;
  private readonly imageType: string = 'data:image/PNG;base64,';

  mainRespDto = new MainRespDto;

  dashpara: string;
  usertype: string;
  zonecode:string;
  dashParam: string[];

  userpProfileList: UserProfilePictures[] = new Array();

  userCode: string;
  val1: any = "";
  val2: any = "";
  val3: any = "";
  val4: any = "";
  val5: any = "";
  val6: any = "";

  name1: any = "";
  name2: any = "";
  name3: any = "";
  name4: any = "";
  name5: any = "";
  name6: any = "";


  ;

  dashbardLevel1 = false;

  colorScheme = {
    domain: ['#F37022', '#000000', '#0C3DA3', '#AAAAAA']
  };

  colorScheme2 = {
    domain: ['#0C3DA3', '#F37022', '#000000', '#AAAAAA']
  };

  colorScheme3 = {
    domain: ['#F37022', '#0C3DA3', '#000000', '#000000']
  };

  colorScheme4 = {
    domain: ['#F37022', '#0C3DA3', '#AAAAAA', '#AAAAAA']
  };

  colorScheme5 = {
    domain: ['#000000', '#0C3DA3', '#AAAAAA', '#F37022']
  };

  // Yearly Target Chart Properties
  yearTshowXAxis = true;
  yearTshowYAxis = true;
  yearTgradient = false;
  yearTshowLegend = true;
  yearTshowXAxisLabel = true;
  yearTshowYAxisLabel = true;
  yearTyAxisLabel = 'Amount';
  yearTbarPadding = 3;
  yearTgroupPadding = 5;


  /////////Line Charts
  lineShowXAxis = true;
  lineShowYAxis = true;
  lineGradient = false;
  lineShowXAxisLabel = true;
  lineShowYAxisLabel = true;
  lineYAxisLabel = 'Amount';
  lineAutoScale = true;

  data = [{
    "name": "USA",
    "value": 5000000
  }]



  constructor(private loginService: LoginService, private dashboardService: DashboardService, private commitmentService:CommitmentService) {
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }
    
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("dashpara");
    this.loginService.pwResetDate();
    this.userCode = this.loginService.currentUser.userCode;

    //console.log(this.userCode);

    if (this.userCode == 'kavinda') {
      this.loadProfilePics();

    }

    this.dashboardService.getDashboardType(this.userCode).subscribe(response => {
      //console.log(response.json());
      this.dashpara = response.json().dashpara;
      this.usertype = response.json().usertype;
      sessionStorage.setItem("userType", this.usertype);
      sessionStorage.setItem("dashpara", this.dashpara);
      

      //console.log(this.dashpara+" -- "+this.usertype);

      //this.ngLoadDashboard();
      
      /*
      if (response.json().dashtype == "DB2") {
        this.dashbardLevel1 = true;
        this.dashpara = response.json().dashpara;
        this.usertype = response.json().usertype;
      }
      */
    }, error => {
      swal("Error", error.text() , "error");
    });

    
  }

  loadProfilePics() {
    this.dashboardService.loadProfilePictures().subscribe(response => {
      this.userpProfileList = response.json();
      //console.log(this.userpProfileList);
    }, error => {
      swal("Error", error.text() , "error");
    });
  }

  ngOnInit() { }
  /*
  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(response => {
      console.log(response.json());
      this.mainRespDto = response.json();
      console.log(this.mainRespDto);

      this.val1 = this.mainRespDto.policySummery[0].value;
      this.val2 = this.mainRespDto.policySummery[1].value;
      this.val3 = this.mainRespDto.policySummery[2].value;
      this.val4 = this.mainRespDto.policySummery[3].value;
      this.val5 = this.mainRespDto.policySummery[4].value;
      this.val6 = this.mainRespDto.policySummery[5].value;

      this.name1 = this.mainRespDto.policySummery[0].name;
      this.name2 = this.mainRespDto.policySummery[1].name;
      this.name3 = this.mainRespDto.policySummery[2].name;
      this.name4 = this.mainRespDto.policySummery[3].name;
      this.name5 = this.mainRespDto.policySummery[4].name;
      this.name6 = this.mainRespDto.policySummery[5].name;
    });
  }
  */

  ngLoadDashboard() {

    if (this.usertype == "IC") {
      this.dashboardService.getCurrentMonthYearlyTarget(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTarget = response.json()[0];
        this.mainRespDto.yearlyTarget = response.json()[1];
        //console.log(this.mainRespDto.monthlyTarget);
        //console.log(this.mainRespDto.yearlyTarget);
      }, error => {
        swal("Error", error.text(), "error");
      });
    }

    if (this.usertype == "UNL") {
      this.dashboardService.getCurrentMonthYearlyTargetUNL(this.dashpara, this.usertype).subscribe(response => {
        //console.log(response.json());
        this.mainRespDto.monthlyTarget = response.json()[0];
        this.mainRespDto.yearlyTarget = response.json()[1];
        this.mainRespDto.cf = response.json()[2];
        this.mainRespDto.cfC = response.json()[3];
        //console.log(this.mainRespDto.monthlyTarget);
        //console.log(this.mainRespDto.yearlyTarget);
        //console.log(this.mainRespDto.cf);
        //console.log(this.mainRespDto.cfC);
      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
      });
    }

    if (this.usertype == "BRANCH" || this.usertype == "REGION" || this.usertype == "ZONE") {

      this.dashboardService.getGWPAndGWPC(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTargetGWP = response.json()[0];
        this.mainRespDto.gwp = response.json()[1];
        this.mainRespDto.gwpC = response.json()[2];
        //console.log(this.mainRespDto.monthlyTargetGWP);
        //console.log(this.mainRespDto.gwp);
        //console.log(this.mainRespDto.gwpC);
      }, error => {
        swal("Error", error.text(), "error");
      });

      this.dashboardService.getMCFPAndMCFPC(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTargetMCFP = response.json()[0];
        this.mainRespDto.mcfp = response.json()[1];
        this.mainRespDto.mcfpC = response.json()[2];
        //console.log(this.mainRespDto.monthlyTargetMCFP);
        //console.log(this.mainRespDto.mcfp);
        //console.log(this.mainRespDto.mcfpC);
      }, error => {
        swal("Error", error.text(), "error");
      });

      this.dashboardService.getFYPAndFYPC(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTargetFYP = response.json()[0];
        this.mainRespDto.fyp = response.json()[1];
        this.mainRespDto.fypC = response.json()[2];
        //console.log(this.mainRespDto.monthlyTargetFYP);
        //console.log(this.mainRespDto.fyp);
        //console.log(this.mainRespDto.fypC);
      }, error => {
        swal("Error", error.text(), "error");
      });

      this.dashboardService.getNOPAndNOPC(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTargetNOP = response.json()[0];
        this.mainRespDto.nop = response.json()[1];
        this.mainRespDto.nopC = response.json()[2];
        //console.log(this.mainRespDto.monthlyTargetNOP);
        //console.log(this.mainRespDto.nop);
        //console.log(this.mainRespDto.nopC);
      }, error => {
        swal("Error", error.text() , "error");
      });

      this.dashboardService.getRINY(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.riny1 = response.json();
      }, error => {
        swal("Error", error.text() , "error");
      });

      this.dashboardService.getPolicySummery(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.policySummery = response.json();
        //console.log(this.mainRespDto.policySummery);
        this.val1 = this.mainRespDto.policySummery[0].value;
        this.val2 = this.mainRespDto.policySummery[1].value;
        this.val3 = this.mainRespDto.policySummery[2].value;
        this.val4 = this.mainRespDto.policySummery[3].value;
        this.val5 = this.mainRespDto.policySummery[4].value;
        this.val6 = this.mainRespDto.policySummery[5].value;

        this.name1 = this.mainRespDto.policySummery[0].name;
        this.name2 = this.mainRespDto.policySummery[1].name;
        this.name3 = this.mainRespDto.policySummery[2].name;
        this.name4 = this.mainRespDto.policySummery[3].name;
        this.name5 = this.mainRespDto.policySummery[4].name;
        this.name6 = this.mainRespDto.policySummery[5].name;
      }, error => {
        swal("Error", error.text() , "error");
      });

    }

    if(this.dashpara != 'HO'){
      this.dashboardService.getDuePolicies(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.duePolicieList = response.json();
        //console.log(this.mainRespDto.duePolicieList);
      }, error => {
        swal("Error", error.text() , "error");
      });
  
      this.dashboardService.getPendingPolicies(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.pendingPolList = response.json();
        //console.log(this.mainRespDto.duePolicieList);
      }, error => {
        swal("Error", error.text() , "error");
      });
    }
    
    
    this.dashboardService.getTopIC().subscribe(response => {
      this.mainRespDto.ic = response.json();
      //console.log(this.mainRespDto.ic);
    }, error => {
      swal("Error", error.text() , "error");
    });

    this.dashboardService.getTopIS().subscribe(response => {
      this.mainRespDto.is = response.json();
      //console.log(this.mainRespDto.is);
    }, error => {
      swal("Error", error.text() , "error");
    });

    this.dashboardService.getTopUL().subscribe(response => {
      this.mainRespDto.ul = response.json();
      //console.log(this.mainRespDto.ul);
    }, error => {
      swal("Error", error.text() , "error");
    });




    /*
  
  
    this.dashboardService.getTopBranch().subscribe(response => {
      this.mainRespDto.branch = response.json();
    });
  
  
    this.dashboardService.getTopRegion().subscribe(response => {
      this.mainRespDto.region = response.json();
    });
  
  
  
  
    this.dashboardService.getTopZone().subscribe(response => {
      this.mainRespDto.zone = response.json();
    });
  
  
    if (this.dashbardLevel1) {
      this.dashboardService.getCurrentMonthTarget(this.dashpara, this.usertype).subscribe(response => {
        this.mainRespDto.monthlyTarget = response.json();
      });
  
      */









    /*

    this.dashboardService.getCF(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.cf = response.json();
    });

    this.dashboardService.getCFC(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.cfC = response.json();
    });

    

  } else {
    this.dashboardService.getCurrentMonthTargetFYP(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.monthlyTargetFYP = response.json();
    });

    this.dashboardService.getCurrentMonthTargetGWP(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.monthlyTargetGWP = response.json();
    });

    this.dashboardService.getCurrentMonthTargetMCFP(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.monthlyTargetMCFP = response.json();
    });

    this.dashboardService.getCurrentMonthTargetNOP(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.monthlyTargetNOP = response.json();
    });

    this.dashboardService.getPolicySummery(this.dashpara, this.usertype).subscribe(response => {
      this.mainRespDto.policySummery = response.json();

      this.val1 = this.mainRespDto.policySummery[0].value;
      this.val2 = this.mainRespDto.policySummery[1].value;
      this.val3 = this.mainRespDto.policySummery[2].value;
      this.val4 = this.mainRespDto.policySummery[3].value;
      this.val5 = this.mainRespDto.policySummery[4].value;
      this.val6 = this.mainRespDto.policySummery[5].value;

      this.name1 = this.mainRespDto.policySummery[0].name;
      this.name2 = this.mainRespDto.policySummery[1].name;
      this.name3 = this.mainRespDto.policySummery[2].name;
      this.name4 = this.mainRespDto.policySummery[3].name;
      this.name5 = this.mainRespDto.policySummery[4].name;
      this.name6 = this.mainRespDto.policySummery[5].name;
    });

    

  }
  */
  }

  onSelectYearT(e: any) {

  }

  onMonthlyTarget(e: any) {

  }

  shoeReq(e) {
    swal("Requirment", e, "warning");
  }

  shoeMobile(e) {
    swal("Contact Number", e, "warning");
  }

  multi = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  approve(e) {
    //console.log(e);
    this.dashboardService.loadProfilePicture(e).subscribe((data) => {
      this.imgUserUrl = this.imageType + data.content;

      swal({
        title: 'Image',
        imageUrl: this.imgUserUrl,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'image',
        animation: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Approve!',
        cancelButtonText: 'No, Don\'t Approve!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this.approveUser(e);
              swal(
                'Approved!',
                'Your file has been approved.',
                'success'
              )
            } else {
              swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        } else {
          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Don\'t Approve it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this.rejectUser(e);
              swal(
                'Rejected!',
                'Your file has been Rejected.',
                'success'
              )
            } else {
              swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        }
      })

    }, error => {
      swal("Error", error.text(), "error");
    });
  }

  approveUser(e) {
    alert(e);
    this.dashboardService.approveImage(e).subscribe(response => {
      this.userpProfileList = response.json();
    }, error => {
      swal("Error", error.text(), "error");
    });
  }

  rejectUser(e) {
    alert(e);
    this.dashboardService.rejectImage(e).subscribe(response => {
      this.userpProfileList = response.json();
    }, error => {
      swal("Error", error.text(), "error");
    });
  }

  reload() {
    if (this.userCode == 'kavinda') {
      this.loadProfilePics();

    }

  }
}

