import React from 'react'

import * as styles from './footer.scss'

const Footer = ({ copyrightLine, content }) => (
  <footer>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8">
            <p class="footer-copyright">{copyrightLine}</p>
            <p>Web design by Rick Poulin. Additional artwork found on this website, YouTube channel, and Spotify Artist page were generated with
              artificial intelligence (AI) using <a target="_blank" href="https://www.bing.com/create">Image Creator from Microsoft Bing</a>.</p>
          </div>

          <nav class="col-12 col-md-4">
            <ul class="nav">
              <li><a class="nav-link" target="_blank" href="mailto:oragus2@yahoo.com" title="E-mail"><i class="fas fa-envelope"></i></a></li>
              <li><a class="nav-link" target="_blank" href="https://www.facebook.com/oragus2" title="Facebook"><i class="fab fa-facebook"></i></a></li>
              <li><a class="nav-link" target="_blank" href="https://www.youtube.com/@Francois_Gerin-Lajoie" title="YouTube"><i class="fab fa-youtube"></i></a></li>
              <li><a class="nav-link" target="_blank" href="https://open.spotify.com/artist/0LMAZVEqk9GYrQOfEpUKLL?si=ma4GwUhFRW6nzBIDImMrog" title="Spotify"><i
                class="fab fa-spotify"></i></a>
              </li>
              <li><a class="nav-link" target="_blank" href="https://oragus.bandcamp.com/" title="Bandcamp"><i class="fab fa-bandcamp"></i></a></li>
              <li><a class="nav-link" target="_blank" href="https://oragus.itch.io/" title="itch.io"><i class="fab fa-itch-io"></i></a></li>
              <li><a class="nav-link" target="_blank" href="https://music.apple.com/ca/artist/fran%C3%A7ois-g%C3%A9rin-lajoie/1697343847" title="iTunes"><i
                class="fab fa-apple"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
