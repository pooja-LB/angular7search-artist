import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormGroup,FormControl,Validators,FormArray, FormBuilder} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private http: HttpClient
  ) {  }

  artistForm:FormGroup;
  private tabName = [];
  formdata :any;
  private tabContent:any
  private tabsContent;
  private shadowStyle: boolean=false;

  ngOnInit() {
    this.artistForm = new FormGroup({
          'name': new FormControl(null, [Validators.required]),
          'numberOfTrack': new FormControl(null, [Validators.required])
    });

  }
  get form() {
    return this.artistForm.controls;
  }
  searchTab(){
    let params = new HttpParams();
    this.shadowStyle = true;
    params = params.append('term', this.artistForm.value.name);
    params = params.append('limit', this.artistForm.value.numberOfTrack);

     this.http.get('http://itunes.apple.com/search', { params: params }).subscribe(res =>{
      if (res) {
          this.formdata = res;
          let tab = [];
          this.formdata.results.forEach(x => {
           let artistName =  x.artistName
            tab.push(artistName);
                artistName = null;
            });
            this.tabName = tab;
            this.artistForm.reset();
      }
     })
   
  }

  searchContent(tab){
    let params = new HttpParams();
    params = params.append('term', tab);
    params = params.append('limit', '1');
    this.http.get('http://itunes.apple.com/search', { params: params }).subscribe(res =>{
      if(res){
      this.tabContent = res;
      let tab = [];
      this.tabContent.results.forEach(x => {
          let artistName ={
            name: x.artistName,
            track : x.trackName,
            artWork : x.artworkUrl30
          }  
          tab.push(artistName);
           artistName = null;
       });
       this.tabsContent = tab;
      }
    })
  }

}
