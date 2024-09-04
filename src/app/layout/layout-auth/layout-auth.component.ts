import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [RouterOutlet, NavAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.scss'
})
export class LayoutAuthComponent {

}
