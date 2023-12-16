# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.auth.models import AbstractUser
from django.db import models

class Marcastarjeta(models.Model):
    marcaid = models.AutoField(db_column='MarcaID', primary_key=True, blank=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=250) # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Marcastarjeta'
        verbose_name_plural = 'MarcasTarjetas'

    def __str__(self):
        return self.nombre

class Tiposcliente(models.Model):
    tipoclienteid = models.AutoField(db_column='TipoClienteID', primary_key=True, blank=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=250)  # Field name made lowercase.
    limite_prestamos = models.IntegerField(db_column='limitePrestamo', blank=True, null=True) 

    class Meta:
        managed = False
        db_table = 'Tiposcliente'
        verbose_name_plural = 'TiposClientes'

    def __str__(self):
        return self.nombre
class Empleado(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.TextField()
    employee_surname = models.TextField()
    employee_hire_date = models.TextField()
    employee_dni = models.TextField(db_column='employee_DNI')  # Field name made lowercase.
    branch_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'empleado'

    def __str__(self):
        return f"{self.employee_name} {self.employee_surname}"


class Cliente(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.TextField()
    customer_surname = models.TextField()  # This field type is a guess.
    customer_dni = models.TextField(db_column='customer_DNI', unique=True)  # Field name made lowercase.
    dob = models.TextField(blank=True, null=True)
    branch_id = models.IntegerField()
    tipoclienteid = models.ForeignKey(Tiposcliente, models.DO_NOTHING, db_column='TipoClienteID', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cliente'

    def __str__(self):
        return f"{self.customer_name} {self.customer_surname}"

class UsuarioCliente(AbstractUser):
    cliente = models.OneToOneField(Cliente, models.DO_NOTHING, blank=True, null=True)
    empleado = models.OneToOneField(Empleado, models.DO_NOTHING, blank=True, null=True)
    tipoclienteid = models.ForeignKey(Tiposcliente, models.DO_NOTHING, db_column='TipoClienteID', blank=True, null=True)
    fotoUrl = models.TextField(blank=True, null=True, default="https://i.imgur.com/Y7PJdJh.jpg")
    esEmpleado = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Cuenta(models.Model):
    account_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Cliente, models.DO_NOTHING)
    balance = models.IntegerField()
    iban = models.TextField()
    tipo_cuenta = models.ForeignKey('TipoCuenta', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cuenta'

    def __str__(self):
        return f"Cuenta {self.account_id} - Cliente: {self.customer.customer_name} {self.customer.customer_surname}"


class Direcciones(models.Model):
    address_id = models.AutoField(primary_key=True, blank=True)
    user_type = models.TextField(blank=True, null=True)
    user_id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='user_id_cliente', blank=True, null=True)
    user_id_empleado = models.ForeignKey('Empleado', models.DO_NOTHING, db_column='user_id_empleado', blank=True, null=True)
    user_id_sucursal = models.ForeignKey('Sucursal', models.DO_NOTHING, db_column='user_id_sucursal', blank=True, null=True)
    street_address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'direcciones'




class Movimientos(models.Model):
    account = models.ForeignKey(Cuenta, models.DO_NOTHING)
    amount = models.IntegerField()
    type = models.TextField()
    created_at = models.TextField()

    class Meta:
        managed = False
        db_table = 'movimientos'
        verbose_name_plural = 'Movimientos'


class Prestamo(models.Model):
    loan_id = models.AutoField(primary_key=True)
    loan_type = models.TextField()
    loan_date = models.TextField()
    loan_total = models.IntegerField()
    loan_status = models.TextField()
    customer = models.ForeignKey(Cliente, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'prestamo'


class Sucursal(models.Model):
    branch_id = models.AutoField(primary_key=True)
    branch_number = models.BinaryField()
    branch_name = models.TextField()
    branch_address_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'sucursal'
        verbose_name_plural = 'Sucursales'

    def __str__(self):
        return self.branch_name


class Tarjeta(models.Model):
    card_id = models.AutoField(primary_key=True)
    card_number = models.IntegerField(blank=True, null=True)
    cvv = models.IntegerField(blank=True, null=True)
    issuance_date = models.TextField(blank=True, null=True)
    expiration_date = models.TextField(blank=True, null=True)
    card_type = models.TextField(blank=True, null=True)
    marcaid = models.ForeignKey(Marcastarjeta, models.DO_NOTHING, db_column='MarcaID', blank=True, null=True)  # Field name made lowercase.
    customer = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tarjeta'


class TipoCuenta(models.Model):
    tipo_id = models.AutoField(primary_key=True, blank=True)
    nombre = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tipo_cuenta'
        verbose_name_plural = "TipoCuentas"

    def __str__(self):
        return self.nombre

class AuditoriaCuenta(models.Model):
    old_id = models.IntegerField()
    new_id = models.IntegerField()
    old_balance = models.IntegerField()
    new_balance = models.IntegerField()
    old_iban = models.TextField()
    new_iban = models.TextField()
    new_type = models.TextField()
    user_action = models.TextField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auditoria_cuenta'
