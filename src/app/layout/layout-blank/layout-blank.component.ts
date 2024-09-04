import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent, FooterComponent],
  templateUrl: './layout-blank.component.html',
  styleUrl: './layout-blank.component.scss'
})
export class LayoutBlankComponent {

}
