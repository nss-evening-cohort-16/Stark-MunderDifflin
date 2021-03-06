using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Stark_MunderDifflin.Repos;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var firebaseCredPath = builder.Configuration["FirebaseCredPath"];

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IOrderRepo, OrderRepo>();
builder.Services.AddTransient<IPaperRepo, PaperRepo>();
builder.Services.AddTransient<ICustomerRepository, CustomerRepo>();
builder.Services.AddTransient<IOrderItemRepo, OrderItemRepo>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile(firebaseCredPath),
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.IncludeErrorDetails = true;
    options.Authority = "https://securetoken.google.com/munderdifflin-f4bf5";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "https://securetoken.google.com/munderdifflin-f4bf5",
        ValidateAudience = true,
        ValidAudience = "munderdifflin-f4bf5",
        ValidateLifetime = true,
    };
});

var dbConnectionString = builder.Configuration["DefaultConnection"];

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
