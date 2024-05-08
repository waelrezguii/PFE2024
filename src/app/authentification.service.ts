  import { Injectable } from '@angular/core';
  import { EMPTY, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
  import { Router } from '@angular/router';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthentificationService {
  isLoggedIn = false;
  private baseUrl = 'http://localhost:8080/api/v1/utilisateurs';
    isLoggedInC = false;
    isLoggedInB=false;
    constructor(private http: HttpClient, private router: Router) {
      this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
      this.isLoggedInC = !!localStorage.getItem('isLoggedInC');
      this.isLoggedInB=!!localStorage.getItem('isLoggedInB');
    }

   
login(email: string, password: string): void {
  const loginInfo = { email, mdp: password };

  this.http.post<any>('http://localhost:8080/api/v1/admins/login', loginInfo)
    .subscribe({
      next: response => {
        console.log('Login successful:', response);
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
        // Redirect to the home page
        this.router.navigateByUrl('').then(() => {
          // Reload the current route
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        });
      },
      error: error => {
        console.error('Login failed:', error);
      }
    });
}

    loginC(email: string, password: string): Observable<any> {
      const loginInfo = { email, mdp: password };
    
      return this.http.post<any>('http://localhost:8080/api/v1/utilisateurs/login', loginInfo)
        .pipe(
          map(response => {
            if (response.user) {
              this.isLoggedInC = true;
              localStorage.setItem('isLoggedInC', 'true');
              localStorage.setItem('user',response.user);
              
              localStorage.setItem('nom', response.user.nom);
              localStorage.setItem('prenom', response.user.prenom);
              localStorage.setItem('cin', response.user.cin);
              this.router.navigate(['/portailCL']);
              return response;
            } else {
              console.error('Login failed:', response);
              return null;
            }
          })
        );
    }
    
    logout(): void {
      localStorage.removeItem('isLoggedIn');
      this.isLoggedIn = false;
      this.router.navigateByUrl('').then(() => {
        // Reload the current route
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    }

    logoutC(): void {
      localStorage.removeItem('isLoggedInC');
      this.isLoggedInC = false;
      localStorage.removeItem('nom');
      localStorage.removeItem('prenom');
      localStorage.removeItem('user')
      localStorage.removeItem('cin')

      this.router.navigateByUrl('').then(() => {
        // Reload the current route
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    } 
    logoutB(): void {
      localStorage.removeItem('isLoggedInB');
      this.isLoggedInB = false;
      localStorage.removeItem('user2');

      localStorage.removeItem('email');
      localStorage.removeItem('codeB');
      this.router.navigateByUrl('').then(() => {
        // Reload the current route
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    }

    registerClient(user: any): Observable<any> {
      return this.http.post<any>('http://localhost:8080/api/v1/utilisateurs/register', user)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              errorMessage = `An error occurred: ${error.error.message}`;
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              errorMessage = `Backend returned code ${error.status}: ${error.message}`;
            }
            return throwError(() => new Error(errorMessage));
          })
        );
    }
    
    verifyEmailToken(token: string): Observable<any> {
      // Construct the URL with the token properly appended
      const url = `http://localhost:8080/api/v1/utilisateurs/verify-email?token=${token}`;
    
      // Make the HTTP GET request to the URL
      return this.http.get<any>(url).pipe(
        map(response => {
          console.log('Response from server:', response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred in verifyEmailToken method:', error);
          if (error.status === 400 && error.error === 'Invalid token.') {
            // Invalid token, show error message
            return throwError(() => new Error('The verification token is invalid or has expired. Please try registering again.'));
          } else {
            console.error('An unexpected error occurred:', error.error.message || 'An unexpected error occurred');
            // Return a user-friendly error message
            return throwError(() => new Error('An error occurred while verifying your email. Please try again later.'));
          }
        })
      );
    }
    getUserByCin(cin: any) {
      const url = `http://localhost:8080/api/v1/utilisateurs/CIN/${cin}`;
      return this.http.get<any>(url);
        
     
    }
    addAnnouncement(announcementData: any) {
      // Make an HTTP POST request to add the announcement
      return this.http.post('http://localhost:8080/api/v1/annoncesC/add', announcementData)
    }
    getBanques(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8080/api/v1/banque/affBanques')
        .pipe(
          tap(response => {
            localStorage.setItem('banque', JSON.stringify(response));
          })
        );
    }
    loginB(email: string, password: string): Observable<any> {
      const loginInfo = { email, mdp: password };
    
      return this.http.post<any>('http://localhost:8080/api/v1/banquiers/loginB', loginInfo)
        .pipe(
          map(response => {
            if (response.user) {
              this.isLoggedInB = true;
              localStorage.setItem('isLoggedInB', 'true');
              localStorage.setItem('user2', JSON.stringify(response.user));
              
              localStorage.setItem('email', response.user.email);
              localStorage.setItem('codeB', response.user.codeB);
              console.log(response);
              
              this.router.navigate(['/portailBlogged']);
              return response;
            } else {
              console.error('Login failed:', response);
              return null;
            }
          })
        );
    }
    forgotPassword(email: string): Observable<any> {
      // Construct the URL with the email query parameter
      const url = `${this.baseUrl}/forgot-password?email=${encodeURIComponent(email)}`;
  
      // Make the HTTP POST request
      return this.http.post(url, {}).pipe(
          catchError((error: HttpErrorResponse) => {
              const errorMessage = `Error: ${error.status} - ${error.error.error}: ${error.message}`;
              console.error('Failed to send forgot password request:', errorMessage);
              return throwError(() => new Error(errorMessage));
          })
      );
  }
  
  
  resetPassword(token: string, password: string): Observable<any> {
    // Construct the URL with the token and password as query parameters
    const url = `${this.baseUrl}/reset-password?token=${encodeURIComponent(token)}&password=${encodeURIComponent(password)}`;
    return this.http.post(url, {}).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Failed to reset password:', error);
            return throwError(() => new Error('Failed to reset password'));
        })
    );
  }
  }