
figure(1); clf ;
imagesc([0,0.35],[2, 0], I) ; set(gca(), 'YDir', 'Normal') ; hold all ;

load Points.mat ; 
theta=[[0:0.01:0.2] 0.25 0.3 0.35 0.4 0.45 0.5 0.6 0.7 0.8 0.9 1 1.5 2 4 8] ;
angles= atan2(YAng/2, XAng/0.35) ; 
angles(end)=0 ; 
plot(cos(angles)*0.35,sin(angles)*2, '*') ; 

rho10 = sqrt((X10/0.35).^2+(Y10/2).^2) ; 
theta10 = atan2(Y10/2, X10/0.35) ;
rho(:,1)=interp1(theta10,rho10,angles) ;

rho20 = sqrt((X20/0.35).^2+(Y20/2).^2) ; 
theta20 = atan2(Y20/2, X20/0.35) ;
rho(:,2)=interp1(theta20,rho20,angles) ; 

rho30 = sqrt((X30/0.35).^2+(Y30/2).^2) ; 
theta30 = atan2(Y30/2, X30/0.35) ;
rho(:,3)=interp1(theta30,rho30,angles) ;

rho40 = sqrt((X40/0.35).^2+(Y40/2).^2) ; 
theta40 = atan2(Y40/2, X40/0.35) ;
rho(:,4)=interp1(theta40,rho40,angles) ;

rho50 = sqrt((X50/0.35).^2+(Y50/2).^2) ; 
theta50 = atan2(Y50/2, X50/0.35) ;
rho(:,5)=interp1(theta50,rho50,angles) ;

rho60 = sqrt((X60/0.35).^2+(Y60/2).^2) ; 
theta60 = atan2(Y60/2, X60/0.35) ;
rho(:,6)=interp1(theta60,rho60,angles) ;

rho70 = sqrt((X70/0.35).^2+(Y70/2).^2) ; 
theta70 = atan2(Y70/2, X70/0.35) ;
rho(:,7)=interp1(theta70,rho70,angles) ;

rho80 = sqrt((X80/0.35).^2+(Y80/2).^2) ; 
theta80 = atan2(Y80/2, X80/0.35) ;
rho(:,8)=interp1(theta80,rho80,angles) ; 

rho90 = sqrt((X90/0.35).^2+(Y90/2).^2) ; 
theta90 = atan2(Y90/2, X90/0.35) ;
rho(:,9)=interp1(theta90,rho90,angles) ; 

plot(cos(angles)*0.35.*rho(:,1), sin(angles)*2.*rho(:,1), 'r*') ; 
plot(cos(angles)*0.35.*rho(:,2), sin(angles)*2.*rho(:,2), 'b*') ; 
plot(cos(angles)*0.35.*rho(:,3), sin(angles)*2.*rho(:,3), 'g*') ; 
plot(cos(angles)*0.35.*rho(:,4), sin(angles)*2.*rho(:,4), 'y*') ; 
plot(cos(angles)*0.35.*rho(:,5), sin(angles)*2.*rho(:,5), 'm*') ; 
plot(cos(angles)*0.35.*rho(:,6), sin(angles)*2.*rho(:,6), 'c*') ; 

targettheta = 0.22 ; 
beta = 85;

for i=1:length(theta)-1
    if (theta(i)<targettheta && theta(i+1)>=targettheta)
        targetang = angles(i) * (theta(i+1)-targettheta)/(theta(i+1)-theta(i)) + angles(i+1) * (targettheta-theta(i))/(theta(i+1)-theta(i)) ;
        idx = i ; 
        break ; 
    end
end ;
disp(targetang) ; 
plot(cos(targetang)*0.35, sin(targetang)*2., 'o', 'LineWidth', 3) ; 

Q1 = (rho(idx, floor(beta/10)) * (ceil(beta/10)*10-beta) + rho(idx, ceil(beta/10)) * (beta - floor(beta/10)*10))/10 ; 
Q2 = (rho(idx+1, floor(beta/10)) * (ceil(beta/10)*10-beta) + rho(idx+1, ceil(beta/10)) * (beta - floor(beta/10)*10))/10 ; 
targetrho = Q1 * (theta(idx+1)-targettheta)/(theta(idx+1)-theta(idx)) + Q2*(targettheta-theta(idx))/(theta(idx+1)-theta(idx))
disp(targetrho) ; 
plot(cos(targetang)*0.35*targetrho, sin(targetang)*2.*targetrho, 'or', 'LineWidth', 3) ; 






