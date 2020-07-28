import React, { Component } from 'react';
import PageHeaderTerms from '../../components/page-header/page-header-simple.component';
import './termsAndConditions.scss';

class TermsAndConditions extends Component<any, any> {
  render(): any {
    return (
      <div className="terms-page">
        <PageHeaderTerms />
        <div className="page-sections">
          <div className="page-sections-large">
            <p className="terms">
              <h3 className="title">Bine ai venit pe No-Hai!</h3>
              Acești termeni și condiții determină modul de folosire al aplicației No-Hai și de
              asemenea furnizează informații despre serviciul No-Hai. În momentul în care vă creați
              un cont pe aplicația No-Hai, sunteți de acoord cu acești termeni și condiții. Ne
              rezervăm dreptul de a revizui acești termeni și condiții în orice moment și prin
              folosirea acestei aplicații, ne așteptăm ca dvs să verificați acești termeni și
              condiții regulat.
              <br />
              <br />
              <h3>Folosirea Cookie-urilor</h3>
              <b>Cookie-urile de tip strict necesare - </b> Aceste cookie uri sunt esențiale pentru
              a vă permite să navigație prin aplicația noastră și să beneficiați de serviciile
              noastre.
              <br />
              <b>Cookie-urile de funcționalitate - </b>Aceste cookie permit aplicației să rețină
              alegerile pe care le faceți în timpul navigării. Aceste informații pe care cookie
              urile le colectează nu vor putea fi folosite pentru a vă identifica personal pe dvs și
              acestea nu va pot urmării activitatea de navigare pe alte aplicații în afara
              aplicației No-Hai.
              <br />
              <br />
              <h3>Ce fel de informații colectăm?</h3>
              <b>Infomații de contact</b>.Cerem permisiunea de acces la adresa dvs de e-mail, pentru
              a păstra legătura cu utilizatorii și pentru a-i putea informa despre schimbările de
              evenimente ale activităților sportive dorite. Cât și informații despre contul
              dumneavoastră.
              <br />
              <b>Informații personale</b>.Precum nume, prenume, oraș, data nașterii, titlul
              job-ului, pagina personală web, pagina personală de facebook și descrierea, aceste
              informații sunt afișate public în interiorul aplicației.
              <br />
              <br />
              <h3>Protecția datelor</h3> Tratăm cu seriozitate protecția infomațiilor personale,
              începănd cu accesul neautorizat pentru procesarea ilegală a informațiilor dvs,
              pierderea accidentală, distrugerea și deteriorarea acestora. Vom păstra informațiile
              dvs personale cat timp vom considera, in mod rezonabil și in orice eveniment, doar
              pentru cât legislația datelor personale permite. Din păcate, transmiterea
              informațiilor prin itermediul internetului nu este complet în siguranță, totuși luăm
              măsuri de protejare a informațiilor dvs personale, nu vă putem garanta siguranța
              totală a datelor dvs transmise prin aplicația noastra, astfel, orice transmitere de
              date este pe riscul dvs.
              <br />
              <br />
              <h3>Care sunt drepturile dvs de protejare a datelor?</h3>
              Dorim să vă cunoașteți drepturile privind protecția datelor.Orice user are dreptul la:
              <br />
              <b>Dreptul la acces</b> – Aveți dreptul de a cere o copie a datelor dvs colectate.
              <br />
              <b> Dreptul la modificare –</b>
              Aveți dreptul de a corecta orice informație care considerați că nu este corectă. De
              asemenea, puteți cere completarea informațiilor care considerați că sunt incomplete.
              <br />
              <b>Dreptul de ștergere – </b>Aveți dreptul de a cere ștergerea datelor personale{' '}
              <br />
              <br />
              <h3>Cum ne puteți contacta?</h3>Dacă aveți întrebări despre termenii și condițiile
              prezentate, protecția datelor, datele colectate sau drepturile de protecție a datelor,
              vă rugăm sa nu ezitați să ne contactați printr-un e-mail la adresa NoHai@mail.com
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsAndConditions;
