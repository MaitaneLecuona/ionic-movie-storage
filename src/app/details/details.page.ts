import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMovie } from 'src/share/interfaces';
import { MoviedbserviceService } from '../core/moviedbservice.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit{
    id: string;
    public movie: IMovie;

    constructor(
        private activatedrouter: ActivatedRoute,
        private router: Router,
        private moviedbService: MoviedbserviceService,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.id = this.activatedrouter.snapshot.params.id;
        this.moviedbService.getItem(this.id).then(
            (data:IMovie) => this.movie = data
        );
    }

    editRecord(movie){
        this.router.navigate(['edit',movie.id])
    }

    async removeRecord(id) {
        const toast = await this.toastController.create({
            header: 'Eliminar película',
            position: 'top',
            buttons: [
                {
                    side:'start',
                    icon: 'delete',
                    text:'ACEPTAR',
                    handler: () => {
                        this.moviedbService.remove(id);
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
        toast.present();
    }
}