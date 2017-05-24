﻿using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace mobilePerformanceXamarin
{
	public partial class App : Application
	{
        public string BackendUrl = "";
		public App()
		{
			InitializeComponent();
            LoginPage = new AppLoginPage();
		}
		protected override void OnStart()
		{
			// Handle when your app starts
		}

		protected override void OnSleep()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume()
		{
			// Handle when your app resumes
		}
	}
}