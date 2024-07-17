import sys
import json
import hashlib
from random import randint

def generate_challenge():
   # print(randint(0, 999))
   # print("challenge in python script")
    return randint(100, 999)

def compute_hash(data):
    hash_object = hashlib.sha256(data.encode())
    hash_hex = hash_object.hexdigest()
    hashed_password_decimal = int(hash_hex, 16)
    return int(hashed_password_decimal)

# def mod_pow(base, exponent, modulus):
#     result = 1
#     base = base % modulus
#     while exponent > 0:
#         if exponent % 2 == 1:
#             result = (result * base) % modulus
#         exponent = exponent >> 1
#         base = (base * base) % modulus
#     return result

def verify(public_key, c, z, challenge):
    print("python verification script")
    challenge=int(challenge)
    Y = int(public_key)
    c = int(c)
    z = int(z)
    g = 2  # generator
    p = 4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779# Prime number

    Yc = pow(Y, c, p)
    Tnot = pow((Yc * pow(2, z, p)),1,p)

 
    hash_input = f"{Y}{Tnot}{challenge}"
    computed_hash = compute_hash(hash_input)
    if c == computed_hash:
        return 1, Tnot,computed_hash
    else:
        return 0, Tnot,computed_hash

if __name__ == '__main__':
    operation = sys.argv[1]
    if operation == "generate_challenge":
        print(generate_challenge())
        sys.stdout.flush() 
    elif operation == "verify":
        public_key, c, z, challenge = sys.argv[2:]
        print(verify(public_key, c, z, challenge))
        sys.stdout.flush()