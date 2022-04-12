using Stark_MunderDifflin.Repos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IPaperRepo, PaperRepo>();
<<<<<<< HEAD
builder.Services.AddTransient<ICustomerRepository, CustomerRepo>();
=======
builder.Services.AddTransient<IOrderItemRepo, OrderItemRepo>();
>>>>>>> main
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
