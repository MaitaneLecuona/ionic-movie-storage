import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMovie } from 'src/share/interfaces';
import { MoviedbserviceService } from '../core/moviedbservice.service';
@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit{
    movie:IMovie;
    movieForm: FormGroup;
    constructor(
        private router: Router,
        private moviedbService: MoviedbserviceService,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.movieForm = new FormGroup({
            name: new FormControl(''),
            genre: new FormControl(''),
            date: new FormControl(''),
            cover: new FormControl(''),
            description: new FormControl(''),
        });
    }

    async onSubmit() {
        const toast = await this.toastController.create({
            header:'Guardar película',
            position: 'top',
            buttons: [
                {
                    side: 'start',
                    icon: 'save',
                    text: 'ACEPTAR',
                    handler: () => {
                        this.saveMovie();
                        this.router.navigate(['home']);
                    }
                }, {
                    text: 'CANCELAR',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });       
    }

    saveMovie() {
        this.movie = this.movieForm.value;
        let nextKey = this.movie.name.trim();
        this.movie.id = nextKey;
        this.moviedbService.setItem(nextKey, this.movie);
        console.warn(this.movieForm.value);
    }
}
